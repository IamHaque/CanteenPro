import React, { useEffect, useState } from 'react';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import SmartTable from '../common/Table/SmartTable';

import { useAlertDialog, useApiRequest, useSnackbar } from '../../hooks';
import { IProduct, ISmartTableHeaderCell } from '../../utils/table';
import { DeletedProductApiResponse } from '../../utils/auth.types';
import AddEditProductModal from './AddEditProductModal';
import AddToProductOfTheDayModal from './AddToProductOfTheDayModal';
import { useAppStore } from '../../store';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    label: 'Product Id',
  },
  {
    id: 'title',
    label: 'Product Name',
  },
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'price',
    label: 'Price',
    type: 'currency',
  },
  {
    id: 'quantity',
    label: 'Quantity',
  },
  {
    id: 'description',
    label: 'Description',
  },
];

export default function ItemManagement() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [openAddToPOTDModal, setOpenAddToPOTDModal] = useState(false);
  const [productDataToUpdate, setProductDataToUpdate] = useState<IProduct>();
  const [openAddEditProductModal, setOpenAddEditProductModal] = useState(false);

  const { openDialog, AlertDialog } = useAlertDialog();
  const { SnackbarComponent, handleClick } = useSnackbar();
  const { data, makeRequest } = useApiRequest<DeletedProductApiResponse>();

  const allProducts = useAppStore.use.allProducts();
  const getAllProducts = useAppStore.use.getAllProducts();
  const getProductsOfTheDay = useAppStore.use.getProductsOfTheDay();

  const handleAddToPOTDModalClose = () => setOpenAddToPOTDModal(false);
  const handleAddEditProductModalOpen = () => setOpenAddEditProductModal(true);
  const handleAddEditProductModalClose = () =>
    setOpenAddEditProductModal(false);

  const actionButtons = [
    {
      title: "Add to 'Items of the Day'",
      icon: <BookmarkAddIcon />,
      onClick: (selectedRowIds: readonly number[]) => {
        if (!selectedRowIds || selectedRowIds.length <= 0) return;

        const productToAdd = allProducts.find(
          (_, index) => index === selectedRowIds[0]
        );

        if (!productToAdd) return;

        setProductDataToUpdate(productToAdd);
        setOpenAddToPOTDModal(true);
      },
    },
    {
      title: 'Update Product',
      icon: <NoteAddIcon />,
      onClick: (selectedRowIds: readonly number[]) => {
        if (!selectedRowIds || selectedRowIds.length <= 0) return;

        const productToUpdate = allProducts.find(
          (_, index) => index === selectedRowIds[0]
        );

        if (!productToUpdate) return;

        setProductDataToUpdate(productToUpdate);
        setOpenAddEditProductModal(true);
      },
    },
  ];

  const handleProductDelete = (selectedRowIds: readonly number[]) => {
    if (!selectedRowIds || selectedRowIds.length <= 0) return;

    const productToDelete = allProducts.find(
      (_, index) => index === selectedRowIds[0]
    );

    if (!productToDelete) return;

    openDialog(
      `Are you sure you want to delete the product ${productToDelete.title}?`,
      `Delete ${productToDelete.title}?`,
      'Confirm',
      () => {
        deleteProduct(productToDelete);
      }
    );
  };

  const deleteProduct = async (productToDelete: IProduct) => {
    await makeRequest(
      `http://localhost:3200/api/v1/product/${productToDelete.productId}`,
      'DELETE'
    );
  };

  useEffect(() => {
    getAllProducts();
  }, [refreshCount]);

  useEffect(() => {
    const deletedProductResData = data?.data?.deleted;

    if (deletedProductResData) {
      handleClick('success', 'Product deleted!', 3000);
      setRefreshCount(refreshCount + 1);
    }
  }, [data]);

  return (
    <React.Fragment>
      <SmartTable
        dense={false}
        rows={allProducts}
        headCells={headCells}
        singleSelection={true}
        disableSelection={false}
        disablePagination={false}
        title="All Available Items"
        actionTitle="Add Item"
        onActionClick={() => {
          setProductDataToUpdate(undefined);
          handleAddEditProductModalOpen();
        }}
        onDeleteClick={handleProductDelete}
        headerButtons={actionButtons}
      />

      <AddEditProductModal
        open={openAddEditProductModal}
        productData={productDataToUpdate}
        handleClose={handleAddEditProductModalClose}
        handleSuccess={() => {
          handleClick('success', 'Product added!', 3000);
          setRefreshCount(refreshCount + 1);
        }}
      />

      <AddToProductOfTheDayModal
        open={openAddToPOTDModal}
        productData={productDataToUpdate}
        handleClose={handleAddToPOTDModalClose}
        handleSuccess={() => {
          handleClick('success', 'Product added!', 3000);
          getAllProducts();
          getProductsOfTheDay();
        }}
      />

      <AlertDialog />
      <SnackbarComponent />
    </React.Fragment>
  );
}
