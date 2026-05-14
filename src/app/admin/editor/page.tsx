// "use client";

// import { useEffect, useState } from "react";
// import Editor from "@/components/Editor";

// export default function AdminEditorPage() {
//   const [content, setContent] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isSaving, setIsSaving] = useState<boolean>(false);

//   // 1. Load content from API
//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const res = await fetch("/api/content");
//         const data = await res.json();
        
//         // Agar data mil jaye toh set karein, warna empty string na rakhein
//         if (data && data.content) {
//           setContent(data.content);
//         }
//       } catch (error) {
//         console.error("Failed to fetch content:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContent();
//   }, []);

//   // 2. Save content to API
//   const saveContent = async () => {
//     setIsSaving(true);
//     try {
//       const res = await fetch("/api/content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content }),
//       });

//       if (res.ok) {
//         alert("Content Saved successfully!");
//       } else {
//         alert("Failed to save content.");
//       }
//     } catch (error) {
//       console.error("Error saving content:", error);
//       alert("An error occurred while saving.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Loading screen taake blank editor ka masla na aaye
//   if (loading) {
//     return (
//       <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//         <h2>Loading Editor...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//         <h2 style={{ margin: 0 }}>Admin HTML Editor</h2>
        
//         <button 
//           onClick={saveContent} 
//           disabled={isSaving}
//           style={{ 
//             padding: "10px 25px", 
//             backgroundColor: isSaving ? "#ccc" : "#0070f3", 
//             color: "white", 
//             border: "none", 
//             borderRadius: "5px", 
//             cursor: isSaving ? "not-allowed" : "pointer",
//             fontWeight: "bold"
//           }}
//         >
//           {isSaving ? "Saving..." : "Save Changes"}
//         </button>
//       </div>

//       {/* Editor Box */}
//       <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", backgroundColor: "white" }}>
//         <Editor value={content} setValue={setContent} />
//       </div>

//       <p style={{ marginTop: "15px", color: "#666", fontSize: "14px" }}>
//         <strong>Pro Tip:</strong> Use <strong>Heading 1</strong> for the main brand title to apply the sweep animation.
//       </p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Editor from "@/components/Editor";

export default function AdminEditorPage() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Yeh hai aapka original default text
  const defaultText = `<p>Smooth hits. Bold flavors.<br>Crafted for a premium vaping experience that defines excellence.</p>`;

  // 1. Load content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        if (data && data.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // 2. Reset Function
  const resetToDefault = () => {
    if (confirm("Kya aap default text par wapis jana chahte hain? Saved tabdeeli khatam ho jayegi.")) {
      setContent(defaultText);
    }
  };

  // 3. Save Function
  const saveContent = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) alert("Content Saved!");
    } catch (error) {
      alert("Error saving!");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-10">Loading Editor...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Admin HTML Editor</h2>
        
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Naya Reset Button */}
          <button 
            onClick={resetToDefault}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#030404", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Reset to Default
          </button>

          <button 
            onClick={saveContent} 
            disabled={isSaving}
            style={{ 
              padding: "10px 25px", 
              backgroundColor: isSaving ? "#ccc" : "#0070f3", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: isSaving ? "not-allowed" : "pointer",
              fontWeight: "bold"
            }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", backgroundColor: "white" }}>
        <Editor value={content} setValue={setContent} />
      </div>

      <p style={{ marginTop: "15px", color: "#666", fontSize: "14px" }}>
       Note: The reset button will only restore the text inside the editor. The frontend will not change until you click “Save.”
      </p>
    </div>
  );
}