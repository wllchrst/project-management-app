import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  VStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { IProject } from "../../interfaces/project-interface";
import { getFile } from "../../functions/utility";
import { useState } from "react";
import { editBackground } from "../../functions/project";
import { loadingToast, successToast, warningToast } from "../../utils/toast";

export default function EditProjectBackground({
  project,
}: {
  project: IProject;
}) {
  const [file, setFile] = useState<File>();
  const toast = useToast();

  function clickHandle() {
    if (file) {
      toast(
        loadingToast(
          "Uploading Background",
          "please wait this might take a moment"
        )
      );
      editBackground(project, file).then((response) => {
        toast.closeAll();
        if (response.success) {
          toast(successToast("Success", ""));
        } else {
          toast(warningToast("someting went wrong", "please try again later"));
        }
      });
    }
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <EditIcon />
        </PopoverTrigger>
        <PopoverContent width={500}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Edit Background</PopoverHeader>
          <PopoverBody>
            <VStack alignItems={"flex-start"}>
              <Input
                type="file"
                onChange={(e) => {
                  getFile(e, setFile);
                }}
              />
              <Button onClick={clickHandle}>Edit</Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
