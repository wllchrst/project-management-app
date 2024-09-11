import {
  Button,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Flex,
  Avatar,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IUser } from "../../interfaces/user-interface";
import { ArrowRightIcon, ChatIcon } from "@chakra-ui/icons";
import { useUserAuth } from "../../contexts/user-context";
import { sendChatPartner } from "../../functions/user";
import { useEffect, useRef, useState } from "react";
import useChat from "../../hooks/use-chats";
import { IJob } from "../../interfaces/job-interface";
import { IChatPartner } from "../../interfaces/chat-partner-interface";
import { chatJob } from "../../functions/project";
import useChatGroup from "../../hooks/use-chat-group";

interface I {
  job: IJob;
}

export default function JobChat({ job }: I) {
  const { user } = useUserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const { chats, isLoading } = useChatGroup(job.id);

  function clickHandle() {
    if (user.email != undefined)
      chatJob(job.id, user.email, input).then((success) => {
        if (success) setInput("");
      });
  }
  return (
    <>
      <Button padding={3} variant={"ghost"} as={Icon} onClick={onOpen}>
        <ChatIcon />
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{job.title}</DrawerHeader>

          <DrawerBody>
            {/* Chat Header */}
            <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 rounded-t-lg">
              <h2 className="text-xl font-semibold">Chat Room</h2>
              <span className="text-sm">Online</span>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {chats.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.from === user.email
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`p-3 rounded-lg shadow-md max-w-xs ${
                      message.from === user.email
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center border-t p-4 bg-gray-50">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="ml-4 px-4 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500 transition"
                onClick={() => {
                  clickHandle();
                }}
              >
                Send
              </button>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
