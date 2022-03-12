import { Box } from "@chakra-ui/react";
import { FilePondFile } from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import { UseFormSetValue } from "react-hook-form";
import { getBase64 } from "utils/getBase64";

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
);

interface ImageUploadProps {
    field: any;
    setValue: UseFormSetValue<Global.Products.AddProduct>;
}

const ImageUpload = ({ field, setValue }: ImageUploadProps) => {
    const handleImageUpload = async (files: FilePondFile[]) => {
        if (files) setValue("image", await getBase64(files[0]?.file as File));
    };

    return (
        <Box w="100%">
            <FilePond
                {...field}
                onupdatefiles={handleImageUpload}
                allowMultiple={false}
                maxFiles={1}
                name="files"
                acceptedFileTypes={["image/*"]}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                maxFileSize="3MB"
            />
        </Box>
    );
};

export default ImageUpload;
