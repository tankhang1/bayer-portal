import { store } from "@/redux/store";
import { redirect } from "next/navigation";
export default function Home() {
  const isAuth = store.getState().app.token ? true : false;
  if (isAuth) redirect("/iqr/iqr-list");
  else redirect("/auth/signin/basic");
}
