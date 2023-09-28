import { storage } from "../firebase";

export const useUpoadImage = () => {
    const uploadImageToStorage = async (compressedImage:File):Promise<string> => {
        const storageRef = storage.ref();
        const ImgRef = storageRef.child(`image/${compressedImage.name}`);
        const uploadImgTask = ImgRef.put(compressedImage);
        
        return new Promise((resolve, reject) => {
          uploadImgTask.on('state_changed', 
            null,
            (error) => { console.error('실패사유는', error); reject(error); }, 
            async () => { resolve(await uploadImgTask.snapshot.ref.getDownloadURL()); }
          );
        });
    }

    return {uploadImageToStorage}
}