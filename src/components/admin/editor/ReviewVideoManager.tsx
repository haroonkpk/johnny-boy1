"use client";
import { useEffect, useState, useRef } from "react";
import { getReviewVideos, deleteReviewVideo, updateReviewVideoAction } from "@/actions/review"; 
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { X, Edit, Trash2 } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { CreateReviewVideoForm } from "@/components/admin/CreateReviewVideoForm";

export default function ReviewVideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  // Edit State
  const [editingVideo, setEditingVideo] = useState<any | null>(null);
  const [editSelectedFile, setEditSelectedFile] = useState<File | null>(null);
  const [editSelectedThumbnail, setEditSelectedThumbnail] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [editThumbnailPreviewUrl, setEditThumbnailPreviewUrl] = useState<string | null>(null);
  const [isUpdatingVideo, setIsUpdatingVideo] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const editThumbnailInputRef = useRef<HTMLInputElement>(null);

  const loadVideos = async () => {
    const data = await getReviewVideos();
    setVideos(data || []);
  };

  useEffect(() => { 
    loadVideos(); 
    return () => {
      if (editPreviewUrl && editPreviewUrl.startsWith("blob:")) URL.revokeObjectURL(editPreviewUrl);
      if (editThumbnailPreviewUrl && editThumbnailPreviewUrl.startsWith("blob:")) URL.revokeObjectURL(editThumbnailPreviewUrl);
    };
  }, [editPreviewUrl, editThumbnailPreviewUrl]);

  // Edit Handlers
  const openEditModal = (video: any) => {
    setEditingVideo(video);
    setEditSelectedFile(null);
    setEditSelectedThumbnail(null);
    setEditPreviewUrl(video.videoUrl || null);
    setEditThumbnailPreviewUrl(video.thumbnailUrl || null);
  };

  const closeEditModal = () => {
    setEditingVideo(null);
    setEditSelectedFile(null);
    setEditSelectedThumbnail(null);
    setEditPreviewUrl(null);
    setEditThumbnailPreviewUrl(null);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditSelectedFile(file);
      const url = URL.createObjectURL(file);
      setEditPreviewUrl(url);
    }
  };

  const handleEditThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditSelectedThumbnail(file);
      const url = URL.createObjectURL(file);
      setEditThumbnailPreviewUrl(url);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!editingVideo) return;
    setIsUpdatingVideo(true);
    try {
      const formData = new FormData();
      formData.append("id", editingVideo._id);
      formData.append("name", editingVideo.name || "");
      formData.append("role", "");
      if (editSelectedFile) {
        formData.append("file", editSelectedFile);
      }
      if (editSelectedThumbnail) {
        formData.append("thumbnail", editSelectedThumbnail);
      }

      const res = await updateReviewVideoAction(formData);
      if (res && !res.success) {
        console.error("Server Action update returned error:", res.error);
        alert(res.error || "Update failed!");
      } else {
        await loadVideos();
        closeEditModal();
      }
    } catch (error) {
      console.error("Client caught update exception:", error);
      alert("Update failed! Check console for details.");
    } finally {
      setIsUpdatingVideo(false);
    }
  };

  const tableHeaders: TableHeader[] = [
    { key: "displayThumbnail", label: "Thumbnail" },
    { key: "displayWatch", label: "Assets" },
  ];

  const displayData = videos.map((v) => ({
    ...v,
    id: v._id,
    displayThumbnail: v.thumbnailUrl ? (
      <div className="w-[clamp(2.5rem,5vw,3.5rem)] h-[clamp(2.5rem,5vw,3.5rem)] flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
        <img src={v.thumbnailUrl} alt="thumbnail" className="object-cover w-full h-full" />
      </div>
    ) : (
      <div className="text-gray-300 text-[10px] font-medium">NO IMG</div>
    ),
    displayWatch: v.videoUrl ? (
      <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline inline-flex items-center gap-1">
        Watch Video
      </a>
    ) : (
      <span className="text-gray-400 text-xs">-</span>
    ),
  }));

  const tableButtons = [
    {
      icon: <Edit size={16} />,
      text: "Edit",
      className: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100/50",
      onClick: (row: any) => openEditModal(row),
    },
    {
      icon: <Trash2 size={16} />,
      text: "Delete",
      className: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-100/50",
      onClick: async (row: any) => {
        if (confirm("Are you sure you want to delete this review video?")) {
          await deleteReviewVideo(row._id);
          loadVideos();
        }
      },
    },
  ];

  const totalPages = Math.ceil(videos.length / PAGE_SIZE);
  const paginatedData = displayData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-10 min-h-screen text-black">
      {/* Creation Card */}
      <CreateReviewVideoForm onSuccess={loadVideos} />

      {/* Videos DataTable Registry Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2 px-2">
          Review Registry
        </h3>
        <Card variant="light" className="p-0 border-none rounded-xl overflow-hidden shadow-sm">
          <DataTable
            heading="Master Video Reviews"
            HeaderBgColor="bg-black"
            HeaderTextColor="text-white"
            TableHeaders={tableHeaders}
            TableData={paginatedData}
            TableButtons={tableButtons}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalEntries={videos.length}
            pageSize={PAGE_SIZE}
          />
        </Card>
      </div>

      {/* Edit Video Modal */}
      <Modal
        isOpen={!!editingVideo}
        onClose={closeEditModal}
        showHeader={false}
        className="max-w-4xl bg-white p-[clamp(1.5rem,3vw,2.5rem)] overflow-hidden rounded-2xl text-black"
      >
        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
          {/* Header with Title and close button */}
          <div className="flex items-start justify-between w-full border-b pb-5 mb-[clamp(1.5rem,3vw,2rem)] border-gray-200">
            <div>
              <h2 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-[#111827] mb-1">
                Update Review Video
              </h2>
              <p className="text-[#64748B] text-[clamp(0.875rem,1vw,1rem)]">
                Modify the details of the customer review video.
              </p>
            </div>
            <button
              type="button"
              onClick={closeEditModal}
              className="text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center w-[clamp(2.5rem,6vw,3.5rem)] h-[clamp(2.5rem,6vw,3.5rem)] cursor-pointer"
            >
              <X className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)]" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video Edit Selector & Preview */}
              <div className="flex flex-col gap-2">
                <label className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide">
                  Video Asset
                </label>
                {editPreviewUrl && (
                  <div className="relative w-full max-w-md h-48 rounded-xl overflow-hidden border border-slate-200 bg-black flex items-center justify-center">
                    <video src={editPreviewUrl} controls className="w-full h-full object-contain" />
                  </div>
                )}
                <Input
                  ref={editFileInputRef}
                  id="editVideoFile"
                  label="Change Video File (Optional)"
                  type="file"
                  accept="video/*"
                  onChange={handleEditFileChange}
                  className="file:bg-black file:text-white file:rounded-sm file:border-0 file:px-4 file:py-1.5 cursor-pointer mt-1"
                />
              </div>

              {/* Thumbnail Edit Selector & Preview */}
              <div className="flex flex-col gap-2">
                <label className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide">
                  Thumbnail Asset
                </label>
                {editThumbnailPreviewUrl && (
                  <div className="relative w-full max-w-md h-48 rounded-xl overflow-hidden border border-slate-200 bg-black flex items-center justify-center">
                    <img src={editThumbnailPreviewUrl} alt="Thumbnail preview" className="w-full h-full object-contain" />
                  </div>
                )}
                <Input
                  ref={editThumbnailInputRef}
                  id="editThumbnailFile"
                  label="Change Thumbnail Image (Optional)"
                  type="file"
                  accept="image/*"
                  onChange={handleEditThumbnailChange}
                  className="file:bg-black file:text-white file:rounded-sm file:border-0 file:px-4 file:py-1.5 cursor-pointer mt-1"
                />
              </div>
            </div>

            {/* Bottom Actions - Full Width Button */}
            <div className="pt-6 border-t border-gray-200 mt-4">
              <Button 
                variant="secondary"
                className="w-full h-12 flex items-center justify-center gap-2"
                onClick={handleUpdateSubmit}
                isLoading={isUpdatingVideo}
              >
                Save Changes & Update Review
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}