import { Box } from "@chakra-ui/react";
import { FilePondFile } from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import "filepond/dist/filepond.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import { UseFormSetValue } from "react-hook-form";
import { getBase64 } from "utils/getBase64";

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImageValidateSize,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
);

interface ImageUploadProps {
    field: any;
    setValue: UseFormSetValue<Global.Products.AddProduct>;
}

const ImageUpload = ({ field, setValue }: ImageUploadProps) => {
    const handleImageUpload = async (files: FilePondFile[]) => {
        if (files)
            setValue(
                "image",
                await getBase64(await files[0]?.requestPrepare())
            );
    };

    return (
        <Box mt="0.5rem" w="100%">
            <FilePond
                {...field}
                onupdatefiles={handleImageUpload}
                allowMultiple={false}
                maxFiles={1}
                name="files"
                acceptedFileTypes={["image/*"]}
                labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                maxFileSize="3MB"
                imageValidateSizeMaxWidth={1920}
                imageValidateSizeMaxHeight={1080}
                onremovefile={() => setValue("image", "")}
                onerror={() => setValue("image", "")}
            />
        </Box>
    );
};

export default ImageUpload;
