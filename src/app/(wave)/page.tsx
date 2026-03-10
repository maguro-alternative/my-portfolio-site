import Uchuemon from "@/components/commonUI/uchuemon";
import Header from "@/components/commonUI/Header";
import ArticlesSection from "@/components/features/ArticlesSection";

export default function Home() {
  return (
    <>
      <Header />
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
        noteId="maguro_alter"
      />
      <div className="text-center p-5 text-white">
        <p>&copy; 2025 Maguro Alternative. All rights reserved.</p>
      </div>
    </>
  );
}
