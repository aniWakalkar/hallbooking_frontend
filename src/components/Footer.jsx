const Footer = () => {
    return (
        <footer className="w-full py-4 px-8 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
            <p className="font-medium">
                HallBooking &copy; {new Date().getFullYear()} | Designed using<span className="text-red-500"> React and Tailwind CSS.</span> 
            </p>
        </footer>
    );
}

export default Footer;