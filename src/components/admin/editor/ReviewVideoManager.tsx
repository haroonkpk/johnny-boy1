"use client";
import { useEffect, useState } from "react";
import { getReviewVideos, deleteReviewVideo, addReviewVideoAction } from "@/actions/review"; 
import Button from "@/components/ui/Button";

export default function ReviewVideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const loadVideos = async () => {
    const data = await getReviewVideos();
    setVideos(data || []);
  };

  useEffect(() => { loadVideos(); }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name || file.name);
      formData.append("role", role || "Guest");

      await addReviewVideoAction(formData);
      await loadVideos();
      setName(""); setRole("");
    } catch (error) {
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-8 p-6  rounded-2xl bg-white shadow-sm text-black">
      <h3 className="text-xl font-bold mb-6">Manage Review Videos</h3>

      <div className="flex flex-col gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
      {/* Input Section */}
<div className="flex flex-col gap-4 mb-8 p-4 bg-gray-50 rounded-[clamp(8px,1.5vw,12px)]">
  <input 
    className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-black focus:outline-none" 
    placeholder="Customer Name" 
    value={name} 
    onChange={(e) => setName(e.target.value)} 
  />
  <input 
    className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-black focus:outline-none" 
    placeholder="Role" 
    value={role} 
    onChange={(e) => setRole(e.target.value)} 
  />
  {/* ... upload button ... */}
</div>
        
        <label className={`cursor-pointer ${isUploading ? "bg-gray-400" : "bg-black"} text-white p-3 rounded text-center`}>
          {isUploading ? "Uploading to Cloudinary..." : "Select Video to Upload"}
          <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
        </label>
      </div>

      <div className="grid gap-4">
        {videos.map((v) => (
          <div key={v._id} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <p className="font-semibold">{v.name}</p>
              <p className="text-xs text-gray-500">{v.role}</p>
            </div>
            <Button className="!bg-black text-white px-4 py-2 rounded-lg" onClick={() => deleteReviewVideo(v._id).then(loadVideos)}>
              Delete
              {/* Delete */}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}