import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
const Footer = () => {
    return (
          <footer>
                <div className="text-white bg-gray-100 py-8">
                  <div className="max-w-[1230px] m-auto px-4 text-center flex w-full justify-between items-center max-[458px]:flex-col max-[458px]:gap-4 max-[458px]:items-start">
                    <p className="text-base text-black">
                      &copy; 2025 Zee&apos;s Foundation. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-2xl text-black group:a[hover]:text-green-900">
                      <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook />
                      </a>
                      <a href="/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                        <FaTiktok />
                      </a>
                      <a href="/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <FaYoutube />
                      </a>
                    </div>
                  </div>
                </div>  
              </footer>
    )
}

export default Footer;