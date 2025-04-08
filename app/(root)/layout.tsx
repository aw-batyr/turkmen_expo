import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-full wrapper w-full overflow-x-hidden relative">
      <Header />
      <main className="flex-auto bg-blueBg">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
