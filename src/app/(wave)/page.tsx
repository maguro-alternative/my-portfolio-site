import Twitter from "@/components/socials/twitter";
import Github from "@/components/socials/github";
import Uchuemon from "@/components/commonUI/uchuemon";

export default function Home() {
  return (
    <>
      <div className="flex md:flex-row justify-between items-center p-2">
        <div className="flex gap-5 mb-2.5 md:mb-0 p-2 text-white">
          <a href="#" className="no-underline">
            Home
          </a>
          <a href="#" className="no-underline">
            About
          </a>
          <a href="#" className="no-underline">
            Contact
          </a>
        </div>
        <div className="flex items-center">
          <Twitter id="sigumataityouda" />
          <Github id="maguro-alternative" />
        </div>
      </div>
      <div className="text-white max-w-4/5 mx-auto">
        <div className="flex md:flex-row justify-center items-center mb-5">
          <div className="md:w-1/2">
            <h1 className="text-4xl">ユニコォォォォォォォォォォォォォォォォォーーーーーーーーーン！！！</h1>
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
      <div className="bi-white opacity-50 text-white">
      </div>
      <div className="text-center p-5 text-white">
        <p>© 2025 Maguro Alternative. All rights reserved.</p>
      </div>
    </>
  );
}
