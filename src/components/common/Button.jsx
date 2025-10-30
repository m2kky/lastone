import React from 'react'

function Button({ children, variant = 'primary', onClick, type = 'button' }) {
  const base = 'relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full overflow-hidden border-2 isolation-auto select-none'
  const motion = 'before:absolute before:inset-0 before:-left-full before:w-0 before:rounded-full before:-z-10 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full'
  const iconWrap = 'w-8 h-8 grid place-items-center rounded-full border transition-all duration-300'
  const iconPath = 'transition-colors duration-300'

  const variants = {
    primary: {
      btn: `${base} ${motion} border-[#EB5E28] text-[#EB5E28] hover:text-white before:bg-[#EB5E28]`,
      iconWrap: `${iconWrap} border-[#EB5E28] group-hover:border-transparent bg-transparent`,
      iconPath: `${iconPath} fill-[#EB5E28] group-hover:fill-[#111827]`,
    },
    ghost: {
      btn: `${base} ${motion} border-gray-400 text-gray-200 hover:text-black before:bg-gray-200`,
      iconWrap: `${iconWrap} border-gray-400 group-hover:border-transparent`,
      iconPath: `${iconPath} fill-black`,
    },
  }

  const v = variants[variant] || variants.primary

  return (
    <button type={type} onClick={onClick} className={`group shadow-xl backdrop-blur-md text-lg ${v.btn}`}>
      {children}
      <span className={`transition-transform duration-300 group-hover:rotate-90 ${v.iconWrap}`}>
        <svg className="w-5 h-5 rotate-45" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" className={v.iconPath} />
        </svg>
      </span>
    </button>
  )
}

export default Button





