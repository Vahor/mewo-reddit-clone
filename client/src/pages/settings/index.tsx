import React from "react";
import {ChangePasswordForm} from "@/components/Settings/ChangePasswordForm";
import {UserInformation} from "@/components/Settings/UserInformation";
import {ChangeUserData} from "@/components/Settings/ChangeUserData";

const SettingsPage = () => {

    return (
        <div className='flex justify-center flex-col w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-4xl'>Settings</h1>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="p-4 bg-white border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:bg-gray-900 rounded shadow-md">
                    <UserInformation/>
                </div>
                <div className="p-4 bg-white border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:bg-gray-900 rounded shadow-md">
                    <ChangeUserData/>
                </div>
                <div className="p-4 bg-white border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:bg-gray-900 rounded shadow-md">
                    <ChangePasswordForm/>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
