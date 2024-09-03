import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SwalAlert from '@/Components/Alert/SwalAlert';
// import layout
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Select from 'react-select';

function SendEmailForm(props) {
    console.log(props.cc);
    const [user, setUser] = useState(props.auth.user);
    const [ccOptions, setCcOptions] = useState( props.cc || []);
    const [bccOptions, setBccOptions] = useState(props.bcc || []);
    const [formData, setFormData] = useState({
        cc: '',
        bcc: ''
    });

    const emailOptions = [
        { value: 'dummy1@example.com', label: 'dummy1@example.com' },
        { value: 'dummy2@example.com', label: 'dummy2@example.com' },
        { value: 'dummy3@example.com', label: 'dummy3@example.com' },
        { value: 'dummy4@example.com', label: 'dummy4@example.com' },
        { value: 'dummy5@example.com', label: 'dummy5@example.com' },
        { value: 'dummy6@example.com', label: 'dummy6@example.com' },
        { value: 'dummy7@example.com', label: 'dummy7@example.com' },
        { value: 'dummy8@example.com', label: 'dummy8@example.com' },
        { value: 'dummy9@example.com', label: 'dummy9@example.com' }
    ];

    const handleCcChange = (selectedOptions) => {
        const selectedEmails = selectedOptions
            ? selectedOptions.map(option => option.value).join(',')
            : '';

        setFormData({
            ...formData,
            cc: selectedEmails,
        });
        setCcOptions(selectedOptions);
    };

    const handleBccChange = (selectedOptions) => {
        const selectedEmails = selectedOptions
            ? selectedOptions.map(option => option.value).join(',')
            : '';

        setFormData({
            ...formData,
            bcc: selectedEmails,
        });
        setBccOptions(selectedOptions);
    };
    console.log('cc: ', ccOptions);
    console.log('bcc: ', bccOptions);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData
        };
        router.post('/send-email', data, {
            onSuccess: () => {
                SwalAlert('success', 'Email sent successfully');
                setContent('');
            },
        });
    };

    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={'Email Setting' -  + ''} />
            <form onSubmit={handleSubmit}>
                <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-gray-100">
                    <table className="table w-full">
                        <tr>
                            <td className="w-3/10 align-top">
                                <label
                                    className="block text-gray-600 font-bold mb-3 pr-4"
                                    htmlFor="cc"
                                >
                                    CC <span className="text-red-600">*</span>
                                </label>
                            </td>
                            <td className="w-7/10 align-top">
                                <Select
                                    isMulti
                                    name="cc"
                                    options={emailOptions}
                                    className="form-input block w-full focus:bg-white p-1 align-right"
                                    value={ccOptions}
                                    onChange={handleCcChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="w-3/10 align-top">
                                <label
                                    className="block text-gray-600 font-bold mb-3 pr-4"
                                    htmlFor="bcc"
                                >
                                    BCC <span className="text-red-600">*</span>
                                </label>
                            </td>
                            <td className="w-7/10 align-top">
                                <Select
                                    isMulti
                                    name="bcc"
                                    options={emailOptions}
                                    className="form-input block w-full focus:bg-white p-1 align-right"
                                    value={bccOptions}
                                    onChange={handleBccChange}
                                />
                            </td>
                        </tr>
                    </table>
                    <div className="md:flex md:datas-center pt-2">
                        <div className="md:w-1/3" />
                        <div className="md:w-2/3">
                            <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-gray-100">
                Email Template setup
                <div className="flex justify-between items-center">
                    <Link href="#">
                        <a className="text-indigo-700 hover:text-indigo-500">Create New Template</a>
                    </Link>
                    <Link href="#">
                        <a className="text-indigo-700 hover:text-indigo-500">Edit Template</a>
                    </Link>
                </div>
            </div>
            <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-gray-100">
                Email Template preview
                <div className="flex justify-between items-center">
                    <Link href="#">
                        <a className="text-indigo-700 hover:text-indigo-500">Preview Template</a>
                    </Link>
                    <Link href="#">
                        <a className="text-indigo-700 hover:text-indigo-500">Delete Template</a>
                    </Link>
                </div>
            </div>
            <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-gray-100">
                send setup
            </div>
            <input type="checkbox" /> invoice Create
            <input type="checkbox" /> invoice Edit
            <input type="checkbox" /> order Create
            <input type="checkbox" /> order Edit
            <input type="checkbox" /> Order refund
            <input type="checkbox" /> Order cancel
        </AuthenticatedLayout>
    );
}

export default SendEmailForm;