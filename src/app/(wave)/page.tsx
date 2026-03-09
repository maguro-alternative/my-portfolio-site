import Link from "next/link";
import Twitter from "@/components/socials/twitter";
import Github from "@/components/socials/github";
import Uchuemon from "@/components/commonUI/uchuemon";
import ArticlesSection from "@/components/features/ArticlesSection";

export default function Home() {
  return (
    <>
      <div className="flex md:flex-row justify-between items-center p-2">
        <div className="flex gap-5 mb-2.5 md:mb-0 p-2 text-white">
          <Link href="/" className="no-underline">
            Home
          </Link>
          <Link href="/profile" className="no-underline">
            Profile
          </Link>
        </div>
        <div className="flex items-center">
          <Twitter id="sigumataityouda" />
          <Github id="maguro-alternative" />
        </div>
      </div>
      <div className="text-white max-w-4/5 mx-auto">
        <div className="flex md:flex-row justify-center items-center mb-5">
          <div className="md:w-1/2">
            <h1 className="text-4xl">
              ようこそ！！！
              <br />
              マグロポートフォリオ用トップページへ！！！
            </h1>
            <p>
              マグロのポートフォリオサイトです。
            </p>
            <p>
              とりあえず合ったほうがいいだろのテンションで作ってます。
            </p>
          </div>
          <div className="flex justify-center items-center mb-5 md:w-1/2">
            <Uchuemon />
          </div>
        </div>
      </div>
      <ArticlesSection
        qiitaId="maguro-alternative"
        zennId="maguro_alterna"
      />
      <div className="text-center p-5 text-white">
        <p>&copy; 2025 Maguro Alternative. All rights reserved.</p>
      </div>
    </>
  );
}
