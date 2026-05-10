import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect to retailers page by default
  redirect("/admin/retailers");
}
