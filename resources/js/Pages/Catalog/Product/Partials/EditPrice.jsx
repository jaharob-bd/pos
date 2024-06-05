import Modal from '@/Components/Modal';
import { router, useForm } from '@inertiajs/react';
import { React, useState } from 'react';
import { FormVarinantPrice } from './FormVarinantPrice';
import { FormGroupPrice } from './FormGroupPrice';
import { ListVariantPrice } from './ListVariantPrice';
import Swal from 'sweetalert2';

const EditPrice = (props) => {
    const [productId, setProductId] = useState(props.product.id);
    const [variantPrices, setVariantPrices] = useState(props.product.variant_prices);
    const [groupPrices, setGroupPrices] = useState(props.product.group_prices);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const initial = {
        product_id: productId,
        variant_name: "",
        buy_price: "",
        sale_price: "",
        mrp_price: ""
    };
    const { data, setData, post, reset, processing } = useForm(initial);
    console.log(data);

    // input onchange handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => {
            let updatedData = { ...prevData, [name]: value };
            return updatedData;
        });
        console.log(data)
        // router.post(`/product-variant-price/${productId}`, data);

    };

    // submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/product-variant-price/${productId}`, data);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        reset();
    };

    const openModal = (content, title) => {
        setModalTitle(title);
        setModalContent(content);
        setIsOpenModal(true);
    };

    return (
        <div>
            <hr className="bg-gray-300 my-3" />
            <h2 id="price" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Price</h2>
            <div className="p-2 mt-3 lg:mt-0 rounded shadow bg-gray-100">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="min-[320px]:text-center max-[600px]:bg-white-300 flex-grow w-full md:w-1/2 p-1">
                            <div className="flex justify-start items-center mb-2">
                                <button type="button" className="variant_price focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" onClick={() => openModal(<FormVarinantPrice
                                    onChangeInput={handleInputChange}
                                    handleSubmit={handleSubmit}
                                />, 'Add Variant Price')}>
                                    <p className="text-sm font-medium leading-none text-white">Add Product Variant Price</p>
                                </button>
                            </div>
                            <ListVariantPrice variants={variantPrices} />
                        </div>
                        <div className="min-[320px]:text-center max-[600px]:bg-sky-300 flex-grow w-full md:w-1/2 p-1">
                            <div className="flex justify-end items-center mb-2">
                                <button type="button" className="group_price focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" onClick={() => openModal(<FormGroupPrice />, 'Add Customer Group Price')}>
                                    <p className="text-sm font-medium leading-none text-white">Add Customer Group Price</p>
                                </button>
                            </div>
                            {/* table */}
                        </div>
                    </div>
                    {/* end */}
                </form>
            </div>
            <Modal show={isOpenModal} title={modalTitle} maxWidth='2xl' onClose={closeModal}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default EditPrice;
