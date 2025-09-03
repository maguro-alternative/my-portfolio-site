import Twitter from "@/components/twitter";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-1 px-5 pt-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 relative z-2 container mx-auto xl:px-10 xl:pt-20 grid grid-cols-1">
        ようこそ！！！
        マグロポートフォリオ用トップページへ！！！
      </h1>
      <div className='sm:block md:flex lg:flex'>
        <Twitter id="sigumataityouda" />
      </div>
    </div>
  );
}
