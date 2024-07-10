import { createFileRoute } from '@tanstack/react-router'
import {
    Card,
    CardContent,
} from "../components/ui/card";
export const Route = createFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <div className=''>
            <div className='flex flex-col absolute top-0'>
                <div className='w-full flex items-center justify-center'>
                    <Card className="text-sky-50 pt-6 px-6 mt-36 text-center shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                        <CardContent>
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">
                                Welcome to SpendLog, your personal expense tracking companion!
                            </h1>
                        </CardContent>
                    </Card>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <Card className="text-sky-50 w-1/2 mt-10 h-full shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                        <div className='m-16'>
                            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent tracking-normal">What is SpendLog?</h2>
                            <p className="mb-6 tracking-wide">
                                SpendLog is a user-friendly web application designed to help you keep track of your expenses effortlessly. Whether you're trying to stick to a budget, understand your spending habits, or just want to be more mindful of where your money goes, SpendLog is here to assist you.
                            </p>
                        </div>
                    </Card>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='mt-10 w-1/2'>
                        <div className="bg-blue-100 p-10 rounded-lg text-blue-800">
                            <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
                            <ul className="list-disc pl-6 mb-6">
                                <li>Easy Expense Logging: Quickly add your expenses with just a title, amount, and date.</li>
                                <li>Expense Overview: View all your logged expenses in one place.</li>
                                <li>Delete Functionality: Remove any expense entries you no longer need.</li>
                                <li>Total Expense Tracking: See your total expenses at a glance on the home page.</li>
                                <li>User Profiles: Create your personal account to keep your expense data private and accessible.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <Card className="text-sky-50 w-1/2 mt-10 h-full shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                        <img src="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" alt="" className='absolute w-1/2 h-80' />

                        <div className='m-16'>
                            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent tracking-normal">How to Use SpendLog:</h2>
                            <ol className="list-decimal pl-6 mb-6">
                                <li>Sign Up: Create your personal account to get started.</li>
                                <li>Navigate Easily: Use our simple navbar to access all features:
                                    <ul className="list-disc pl-6 mt-2">
                                        <li>Home: View your total expenses</li>
                                        <li>Create: Add new expenses</li>
                                        <li>Expenses: Review and manage your expense list</li>
                                        <li>Profile: Access your account settings</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </Card>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='mt-10 w-1/2'>
                        <div className="bg-blue-100 p-10 rounded-lg text-blue-800 ">
                            <h2 className="text-2xl font-semibold mb-4">Why SpendLog?</h2>
                            <p className="mb-6">
                                In today's fast-paced world, keeping track of expenses can be challenging. SpendLog aims to simplify this process, helping you gain better control over your financial life. Whether you're saving for a goal, trying to cut back on spending, or just curious about where your money goes, SpendLog provides the tools you need.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <Card className="text-sky-50 w-1/2 mt-10 h-full shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                        <img src="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" alt="" className='absolute w-1/2 h-60 ' />
                        <div className='m-16'>
                            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent tracking-normal">Future Plans:</h2>
                            <p className="mb-6">
                                As a personal project, SpendLog is continually evolving. We're always open to new ideas and improvements to make expense tracking even easier and more insightful for our users.
                            </p>
                        </div>
                    </Card>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='mt-10 w-1/2'>
                        <div className="bg-blue-100 p-10 rounded-lg text-blue-800">
                            <h2 className="text-2xl font-semibold mb-2">Get Started:</h2>
                            <p>
                                Ready to take control of your expenses? Sign up now and start logging your spending with SpendLog!
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='my-10 w-1/2'>
                        <div className="bg-blue-100 p-10 rounded-lg text-blue-800">
                            <p className="m-6 font-semibold text-center text-2xl">
                                Thank you for choosing SpendLog for your expense tracking needs!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
