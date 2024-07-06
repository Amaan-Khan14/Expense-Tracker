import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: Root,
});

function Home() {
    return (
        <div>
            <img src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif" className='absolute top-0 opacity-50 ' />
            <nav className="fixed z-[99999] hidden w-full px-24 text-sm md:flex ">
                <div className="fixed right-0 left-0 top-5 z-30 mx-auto text-white bg-transparent">
                    <ul className="flex relative items-center py-3 px-5 mx-auto text-sm text-gray-200 bg-gradient-to-tr to-transparent rounded-full border-2 w-fit border-white/5 from-zinc-300/5 via-gray-400/5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-lg backdrop-filter">
                        <li className="transition ease-in-out delay-300 hover:-translate-y-1.5 hover:scale-11 duration-500 block relative z-10 py-2.5 px-3 text-xs text-white cursor-pointer md:py-2 md:px-5 md:text-base mix-blend-difference">
                            <Link to="/" className="hover:text-white ">Home</Link>
                        </li>
                        <li className="transition ease-in-out delay-300 hover:-translate-y-1.5 hover:scale-11 duration-500 block relative z-10 py-2.5 px-3 text-xs text-white cursor-pointer md:py-2 md:px-5 md:text-base mix-blend-difference">
                            <Link to="/about" className="hover:text-white">About</Link>
                        </li>
                        <li className="transition ease-in-out delay-300 hover:-translate-y-1.5 hover:scale-11 duration-500 block relative z-10 py-2.5 px-3 text-xs text-white cursor-pointer md:py-2 md:px-5 md:text-base mix-blend-difference">
                            <Link to="/expenses" className="hover:text-white">Expense</Link>
                        </li>
                        <li className="transition ease-in-out delay-300 hover:-translate-y-1.5 hover:scale-11 duration-500 block relative z-10 py-2.5 px-3 text-xs text-white cursor-pointer md:py-2 md:px-5 md:text-base mix-blend-difference">
                            <Link to="/createExpense" className="hover:text-white">Create</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
function Root() {
    return (
        <>
            <Home />
            <Outlet />
        </>
    );
}
