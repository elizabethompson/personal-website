import React from 'react'

const SmoothLink = ({ children, ...props }) => {
    const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top)

    const handleScroll = (e) => {
        e.preventDefault()

        const target = event.target
            , targetID = target.getAttribute('href')
            , targetAnchor = document.querySelector(targetID)

        if (!targetAnchor) return

        const originalTop = distanceToTop(targetAnchor)

        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })

        const checkIfDone = setInterval(function () {
            const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
            if (distanceToTop(targetAnchor) === 0 || atBottom) {
                targetAnchor.tabIndex = '-1'
                // targetAnchor.focus()
                window.history.pushState('', '', targetID)
                clearInterval(checkIfDone)
            }
        }, 100)
    }

    return (

        <a {...props} onClick={(e) => handleScroll(e)}>{children}</a>

    )
}

export default SmoothLink
