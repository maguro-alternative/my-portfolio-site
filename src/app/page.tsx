import Twitter from "@/components/socials/twitter";
import Github from "@/components/socials/github";
import Uchuemon from "@/components/commonUI/uchuemon";
import SpotlightAndWave from "@/components/features/SpotLightAndWave";

export default function Home() {
  return (
    <div className="container mx-auto">
      <SpotlightAndWave />
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
      <div className="bg-white opacity-50">
        <img 
          className='sm:float-none md:float-left lg:float-left md:w-1/12 md:h-3/6 xl:w-2/12'
          src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" 
        />
        <img 
          className='sm:float-none md:float-left lg:float-left md:w-1/12 md:h-3/6 xl:w-2/12'
          src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" 
        />
        <img 
          className='sm:float-none md:float-left lg:float-left md:w-1/12 md:h-3/6 xl:w-2/12'
          src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" 
        />
        <img 
          className='sm:float-none md:float-left lg:float-left md:w-1/12 md:h-3/6 xl:w-2/12'
          src="https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white" 
        />
        <img 
          className='sm:float-none md:float-left lg:float-left md:w-1/12 md:h-3/6 xl:w-2/12'
          src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white" 
        />
      </div>
      <div className="text-center p-5 text-white">
        <p>© 2025 Maguro Alternative. All rights reserved.</p>
      </div>
    </div>
  );
}
