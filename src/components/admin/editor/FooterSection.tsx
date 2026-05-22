"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { updateFooter } from "@/actions/editor";

interface FooterData {
  footerDesc: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  footerFacebook: string;
  footerYoutube: string;
  footerInstagram: string;
  footerNewsTitle: string;
}

export default function FooterSection({
  initialData,
}: {
  initialData: FooterData;
}) {
  const [data, setData] = useState<FooterData>(initialData);
  const [loading, setLoading] = useState(false);

  const isChanged =
    JSON.stringify(data) !== JSON.stringify(initialData);

  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await updateFooter(data);

      if (res?.success) {
        toast.success("Footer updated successfully!");
      } else {
        toast.error(res?.message || "Failed to update");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-black mb-20 md:bottom-0">
      <h2 className="text-2xl font-bold">
        Edit Footer Content
      </h2>

      <div className="space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">
            Description
          </label>

          <Textarea
            value={data.footerDesc}
            onChange={(e) =>
              setData({
                ...data,
                footerDesc: e.target.value,
              })
            }
            placeholder="Enter footer description..."
            className="min-h-[120px]"
          />
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Address
            </label>

            <Input
              value={data.footerAddress}
              onChange={(e) =>
                setData({
                  ...data,
                  footerAddress: e.target.value,
                })
              }
              placeholder="Enter address"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Phone
            </label>

            <Input
              value={data.footerPhone}
              onChange={(e) =>
                setData({
                  ...data,
                  footerPhone: e.target.value,
                })
              }
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Email
            </label>

            <Input
              type="email"
              value={data.footerEmail}
              onChange={(e) =>
                setData({
                  ...data,
                  footerEmail: e.target.value,
                })
              }
              placeholder="Enter email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Latest News Title
            </label>

            <Input
              value={data.footerNewsTitle}
              onChange={(e) =>
                setData({
                  ...data,
                  footerNewsTitle: e.target.value,
                })
              }
              placeholder="Enter latest news title"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Social Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Facebook
              </label>

              <Input
                value={data.footerFacebook}
                onChange={(e) =>
                  setData({
                    ...data,
                    footerFacebook: e.target.value,
                  })
                }
                placeholder="Facebook URL"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Youtube
              </label>

              <Input
                value={data.footerYoutube}
                onChange={(e) =>
                  setData({
                    ...data,
                    footerYoutube: e.target.value,
                  })
                }
                placeholder="Youtube URL"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Instagram
              </label>

              <Input
                value={data.footerInstagram}
                onChange={(e) =>
                  setData({
                    ...data,
                    footerInstagram: e.target.value,
                  })
                }
                placeholder="Instagram URL"
              />
            </div>
          </div>
        </div>
      </div>

     <div className="mt-[clamp(0.75rem,2vw,1rem)]">
  <Button
    variant="secondary"
    className="w-full"
    isLoading={loading}
    disabled={loading || !isChanged}
    onClick={handleSave}
  >
    Update Footer
  </Button>
</div>
    </div>
  );
}