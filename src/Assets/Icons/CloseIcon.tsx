const CloseIcon = ({className}: { className?: string }) => {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.64335 12.3565L10.0009 9.99984M10.0009 9.99984L12.3575 7.64317M10.0009 9.99984L7.64335 7.64317M10.0009 9.99984L12.3575 12.3565M10 18.3332C14.6025 18.3332 18.3334 14.6023 18.3334 9.99984C18.3334 5.39734 14.6025 1.6665 10 1.6665C5.39752 1.6665 1.66669 5.39734 1.66669 9.99984C1.66669 14.6023 5.39752 18.3332 10 18.3332Z"
                stroke="#787486" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}
export default CloseIcon