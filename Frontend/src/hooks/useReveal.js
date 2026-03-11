import { useEffect } from 'react'

export function useReveal() {

  useEffect(() => {

    const reveal = () => {

      const elements = document.querySelectorAll('.reveal')

      elements.forEach(el => {

        const rect = el.getBoundingClientRect()

        if (rect.top < window.innerHeight - 60) {

          el.classList.add('visible')

        }

      })

    }


    // run initially
    reveal()


    // scroll container
    const scroller = document.getElementById('main-scroll')

    if (scroller) {

      scroller.addEventListener('scroll', reveal)

    }


    // fallback window scroll
    window.addEventListener('scroll', reveal)


    return () => {

      if (scroller) {

        scroller.removeEventListener('scroll', reveal)

      }

      window.removeEventListener('scroll', reveal)

    }

  }, [])

}