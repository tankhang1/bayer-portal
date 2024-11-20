import { redirect } from "next/navigation";
export default function Home() {
  const isAuth = false;
  if (isAuth) redirect("/dashboard/sales");
  else redirect("/auth/signin/basic");
}
