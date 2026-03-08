export function SiteFooter() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-1 bg-black py-3 relative z-10 pointer-events-auto select-text">
        <p className="pointer-events-auto text-center text-sm text-white">
          &copy; 2025 Maguro Alternative. All rights reserved.
        </p>
        <p className="pointer-events-auto text-center text-sm text-white">
          作者のTwitter: <a href="https://twitter.com/sigumataityouda" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">@sigumataityouda</a>, <a href="https://twitter.com/maguro_alterich" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">@maguro_alterich</a>
        </p>
        <p className="pointer-events-auto text-center text-sm text-white">
          画像：&copy;Marvelous Inc. &copy;HONEY PARADE GAMES Inc.
        </p>
      </div>
    </div>
  );
}
