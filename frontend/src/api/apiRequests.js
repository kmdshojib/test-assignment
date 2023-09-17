import { toast } from "react-toastify";
import { axiosApi } from "./axios";

export const addProdduct = async (data) => {
    const result = await axiosApi.post("/postProduct.php", data);
    if ("data" in result) {
        toast.success("Product added successfully");
    }
}
export const getProducts = async () => {
    const result = await axiosApi.get("/getProducts.php");
    if ("data" in result) {
        return result.data;
    }
}
export const getCategories = async () => {
    try {
        const result = await axiosApi.get("/getCategories.php")
        if ("data" in result) {
            return result.data;
        }
    } catch (error) {
        if (error) {
            throw new Error(error.message)
        }
    }
}

export const deleteProduct = async (data) => {
    try {
        const result = await axiosApi.delete("/deleteProducts.php", { data });
        if (result.data) {
            toast.error("Product deleted successfully");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }

}