// script.js

function onReady(fn) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn);
    } else {
        fn();
    }
}

onReady(() => {
    const header = document.querySelector("header");
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) header.classList.add("sticky");
        else header.classList.remove("sticky");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const skillBars = Array.from(document.querySelectorAll(".skill-progress[data-width]"));
    const revealSkills = () => {
        for (const bar of skillBars) {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                bar.style.width = bar.getAttribute("data-width") || "0%";
            }
        }
    };
    window.addEventListener("scroll", revealSkills, { passive: true });
    revealSkills();

    const modal = document.getElementById("media-modal");
    const modalTitle = document.getElementById("media-modal-title");
    const modalVideo = document.getElementById("media-modal-video");
    const modalClose = document.getElementById("media-modal-close");

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.removeAttribute("src");
            modalVideo.load();
        }
    };

    const openModal = ({ title, videoSrc }) => {
        if (!modal || !modalVideo) return;
        if (modalTitle) modalTitle.textContent = title || "Demo";
        modalVideo.src = videoSrc;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        modalVideo.focus?.();
    };

    document.addEventListener("click", (e) => {
        const target = e.target;
        const link = target?.closest?.(".js-open-demo");
        if (!link) return;
        e.preventDefault();

        const title = link.getAttribute("data-title") || "Demo";
        const videoSrc = link.getAttribute("data-video");
        if (!videoSrc) return;
        openModal({ title, videoSrc });
    });

    modalClose?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});