import React, { useEffect, useState } from 'react';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import SmartTable from '../common/Table/SmartTable';

import { useAlertDialog, useApiRequest, useSnackbar } from '../../hooks';
import { IProduct, ISmartTableHeaderCell } from '../../utils/table';
import {
  AllProductApiResponse,
  DeletedProductApiResponse,
} from '../../utils/auth.types';
import AddEditProductModal from './AddEditProductModal';
import AddToProductOfTheDayModal from './AddToProductOfTheDayModal';

const headCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    numeric: false,
    label: 'Product Id',
    disablePadding: false,
  },
  {
    id: 'title',
    numeric: false,
    label: 'Product Name',
    disablePadding: false,
  },
  {
    id: 'category',
    numeric: false,
    label: 'Category',
    disablePadding: false,
  },
  {
    id: 'price',
    numeric: false,
    label: 'Price',
    disablePadding: false,
  },
  {
    id: 'quantity',
    numeric: false,
    label: 'Quantity',
    disablePadding: false,
  },
  {
    id: 'description',
    numeric: false,
    label: 'Description',
    disablePadding: false,
  },
];

export default function ItemManagement() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [openAddToPOTDModal, setOpenAddToPOTDModal] = useState(false);
  const [productDataToUpdate, setProductDataToUpdate] = useState<IProduct>();
  const [openAddEditProductModal, setOpenAddEditProductModal] = useState(false);

  const { openDialog, AlertDialog } = useAlertDialog();
  const { SnackbarComponent, handleClick } = useSnackbar();
  const { data, makeRequest } = useApiRequest<
    AllProductApiResponse | DeletedProductApiResponse
  >();

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

        const productToAdd = productData.find(
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

        const productToUpdate = productData.find(
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

    const productToDelete = productData.find(
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
    const getAllProducts = async () => {
      await makeRequest('http://localhost:3200/api/v1/product/', 'GET');
    };

    getAllProducts();
  }, [refreshCount]);

  useEffect(() => {
    const allProductResData = (data as AllProductApiResponse)?.data?.items;
    const deletedProductResData = (data as DeletedProductApiResponse)?.data
      ?.deleted;

    if (allProductResData) {
      const parsedAllProductResData = allProductResData.map(
        (product, index): IProduct => {
          return {
            id: index,
            title: product.title,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            productId: product.productId,
            thumbnail: product.thumbnail,
          };
        }
      );

      setProductData([...parsedAllProductResData]);
    } else if (deletedProductResData) {
      handleClick('success', 'Product deleted!', 3000);
      setRefreshCount(refreshCount + 1);
    }
  }, [data]);

  return (
    <React.Fragment>
      <SmartTable
        dense={false}
        rows={productData}
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
        }}
      />

      <AlertDialog />
      <SnackbarComponent />
    </React.Fragment>
  );
}
