"use client";

import { useRouter } from "next/navigation";
import AgeVerification from "@/components/auth/AgeVerification";

export default function SignupPage() {
  const router = useRouter();
 
  return (
    <AgeVerification
      onVerified={() => {
        router.push("/"); 
      }}
    />
  );
}