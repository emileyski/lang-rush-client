import React, { useEffect, useState } from "react";
import { useFoldersQuery } from "src/genetated/types";
import { removeTokens } from "src/utils";
import { useNavigate } from "react-router-dom";
import Loader from "src/ui/Loader";
import Folder from "./Folder";
import FolderAdd from "./FolderAdd";
import Dialog from "src/ui/Dialog";
import FormAddFolder from "./FormAddFolder";
import FormDeleteWord from "./FormDeleteWord";

const FoldersContainer = () => {
  // const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);
  const { data, loading, error } = useFoldersQuery();
  const navigate = useNavigate();
  const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);

  const [isDeletingFolder, setIsDeletingFolder] = useState<boolean>(false);
  const [deleteFolderId, setDeleteFolderId] = useState<string>("");

  const handleDeleteClick = (id: string) => {
    setDeleteFolderId(id);
    setIsDeletingFolder(true);
  };

  useEffect(() => {
    if (error?.message === "Unauthorized") {
      removeTokens();
      navigate("/signin");
    }
  }, [error, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap gap-[25px] pt-[70px]">
      <FolderAdd onClick={() => setIsAddingFolder(true)} />
      {data?.folders.map((folder, i) => (
        <Folder
          key={i}
          id={folder.id}
          name={folder.name}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
      {isAddingFolder && (
        <Dialog onClose={() => setIsAddingFolder(false)}>
          <FormAddFolder onClose={() => setIsAddingFolder(false)} />
        </Dialog>
      )}
      {isDeletingFolder && (
        <Dialog onClose={() => setIsDeletingFolder(false)}>
          <FormDeleteWord
            id={deleteFolderId}
            onClose={() => setIsDeletingFolder(false)}
          />
        </Dialog>
      )}
    </div>
  );
};

export default FoldersContainer;
