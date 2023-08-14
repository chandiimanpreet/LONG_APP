import React from 'react'

export default function Pulse() {
    return (
        <>
            <div className='grid grid-cols-4 m-6 gap-x-4'>
                <div className="border border-slate-200 rounded-md p-4 w-72">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="h-10 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-slate-200 rounded-md p-4 w-72">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="h-10 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-slate-200 rounded-md p-4 w-72">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="h-10 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-slate-200 rounded-md p-4 w-72">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="h-10 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export const ModalPulse = () => {
    return (
        <>
            <div className="rounded-md p-2">
                <div className="animate-pulse space-y-[1.2rem]">
                    <div className='flex space-x-12'>
                        <div className="rounded-sm bg-slate-200 h-8 w-40"></div>
                        <div className="rounded-sm bg-slate-200 h-8 w-40"></div>
                    </div>
                    <div className='flex space-x-12'>
                        <div className="rounded-sm bg-slate-200 h-16 w-[26.7rem]"></div>
                        <div className="rounded-sm bg-slate-200 h-16 w-80"></div>
                    </div>
                    <div className='flex space-x-12'>
                        <div className="rounded-sm bg-slate-200 h-24 w-[26.5rem]"></div>
                        <div className="rounded-sm bg-slate-200 h-16 w-80"></div>
                    </div>
                    <div className='flex'>
                        <div className='flex space-x-10 w-1/2'>
                            <div className="rounded-sm bg-slate-200 h-8 w-40"></div>
                            <div className="rounded-sm bg-slate-200 h-8 w-40"></div>
                        </div>
                        <div className='flex space-x-10 w-1/2 justify-end'>
                            <div className="rounded-sm bg-slate-200 h-10 w-40"></div>
                            <div className="rounded-sm bg-slate-200 h-10 w-40"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}