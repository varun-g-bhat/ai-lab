import React, { useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaClipboardCheck } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { CornerDownLeft, Paperclip, Mic, Trash2, Plus, X } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { addDiscussion, addReply, getDiscussion } from "@/http/discussionApi";
import io from "socket.io-client";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/auth";
import { toast } from "react-toastify";
import { toastOptions } from "@/config/toast";
import { Discussion } from "@/types/discussion";

const socket = io(`${process.env.BACKEND_URL}`);

const Community: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<Discussion | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [reply, setReply] = useState("");
  const messagesEndRef = useRef(null);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getDiscussion();
      setDiscussions(response.data);
    };
    fetchQuestions();

    const handleNewQuestion = (question: Discussion) => {
      setDiscussions((prevQuestions) => [...prevQuestions, question]);
    };

    const handleNewReply = ({ reply }: { reply: Discussion[] }) => {
      if (reply[0]._id === selectedDiscussion?._id) {
        setSelectedDiscussion(reply[0]);
      }
      discussions.map((discussions) =>
        discussions._id === reply[0]._id
          ? (discussions.replies = reply[0].replies)
          : discussions
      );
    };

    socket.on("newQuestion", handleNewQuestion);
    socket.on("newReply", handleNewReply);

    // Cleanup function
    return () => {
      socket.off("newQuestion", handleNewQuestion);
      socket.off("newReply", handleNewReply);
    };
  }, [discussions, selectedDiscussion]);

  const handleClick = (id: string) => {
    const discussion = discussions.filter(
      (discussion) => discussion._id === id
    );
    console.log(discussion);
    setSelectedDiscussion(discussion[0]);
  };

  const addDiscussions = useMutation({
    mutationFn: addDiscussion,
    onSuccess: () => {
      toast.success("Discussion posted", toastOptions);
    },
    onError: (error: AxiosError) => {
      const errResponse = error.response?.data as ErrorResponse;
      toast.error(errResponse.message, toastOptions);
    },
  });

  const handleAddDiscussion = () => {
    addDiscussions.mutate({ title, description, tags });
  };

  const handleAddReply = async (id: string) => {
    await addReply({ id, reply });
    setReply("");
  };

  useEffect(() => {
    const messages = document.querySelectorAll(".message");

    if (messages.length !== 0) {
      messages[messages.length - 1].scrollIntoView();
    }
  }, [selectedDiscussion]);

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-100 rounded-lg border"
      >
        <ResizablePanel defaultSize={65}>
          <div className="w-100">
            <div className="">
              <div className="m-4 w-100">
                <div
                  className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring flex flex-row items-center"
                  x-chunk="dashboard-03-chunk-1"
                >
                  <Input
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  />
                  <div className="flex items-center ">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="submit"
                          size="sm"
                          className="ml-auto gap-1.5"
                        >
                          New post
                          <FaPlus />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Post Details</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Title
                            </Label>
                            <Input
                              id="title"
                              placeholder="Title"
                              className="col-span-3"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="message" className="text-right">
                              Message
                            </Label>
                            <Input
                              id="message"
                              placeholder="Enter a Message"
                              className="col-span-3"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <fieldset className="grid gap-6 rounded-lg border p-4">
                          <legend className="-ml-1 px-1 text-sm font-medium">
                            Tags
                          </legend>
                          <div className="flex gap-2">
                            <Input
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              placeholder="New tag"
                            />
                            <Button variant="outline" onClick={handleAddTag}>
                              Add tag <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {tags.length !== 0 && (
                            <ScrollArea className="w-100 whitespace-nowrap rounded-md border">
                              <div className="grid grid-rows-1 grid-flow-col p-4 overflow-y-auto gap-7">
                                {tags.map((tag, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    className="flex flex-row gap-5 w-fit"
                                  >
                                    {tag}
                                    <Trash2
                                      className="h-4 w-4"
                                      onClick={() => handleRemoveTag(tag)}
                                    />
                                  </Button>
                                ))}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          )}
                        </fieldset>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button onClick={handleAddDiscussion}>Add</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Separator className="my-4 " />
              </div>
            </div>
            <ScrollArea className="h-[500px] w-100 rounded-md border m-4 p-3">
              <div>
                <h1 className="text-xl font-bold flex flex-row items-center mb-3">
                  <FaClipboardCheck className="w-5 h-5" /> Post Guidelines
                </h1>
                <div className="bg-gray-200 rounded">
                  <p className="p-2 ">
                    1. Be respectful and considerate towards fellow community
                    members. <br />
                    2. Keep posts relevant and focused on the community's
                    purpose. <br />
                    3. Share valuable content that enriches discussions and
                    learning experiences.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex gap-3 flex-col ">
                {discussions.map((discussion) => (
                  <button
                    key={discussion._id}
                    onClick={() => handleClick(discussion._id)}
                    className="border-2 p-3 rounded hover:shadow-2xl [transition:all_0.5s]"
                  >
                    <div>
                      <div className="flex justify-start h-30 flex-col gap-3 overflow-hidden">
                        <div className="flex gap-3">
                          {discussion.tags.map((tag) => (
                            <Badge className="w-fit">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex flex-row gap-5">
                          <div>
                            <h2 className="text-xl text-start gap-3 font-semibold">
                              {discussion.title}
                            </h2>
                          </div>
                        </div>
                        <p className="text-start overflow-hidden h-[50px]">
                          <span className="font-semibold">
                            {discussion.author.userDetails.name}:{" "}
                          </span>
                          {discussion.description}
                        </p>
                        <div className="flex flex-row justify-end font-semibold">
                          <span>
                            {moment(discussion.createdAt).format(
                              "MMMM Do, YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {selectedDiscussion && (
          <ResizablePanel defaultSize={35}>
            <div className="m-4">
              <div className="flex flex-row justify-between items-center gap-3">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h2 className="font-bold text-lg">
                      {selectedDiscussion.author.userDetails.name}
                    </h2>
                    <span className="text-xs text-gray-500">OP</span>
                  </div>
                </div>
                <X onClick={() => setSelectedDiscussion(null)} />
              </div>
              <Separator className="my-4" />

              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold">
                  {selectedDiscussion.title}
                </h2>

                <div className="flex flex-col">
                  <p className="whitespace-pre-wrap break-words">
                    <ReactMarkdown>
                      {selectedDiscussion.description}
                    </ReactMarkdown>
                  </p>
                  <span className="text-sm text-gray-500 self-end">
                    {moment(
                      moment(selectedDiscussion.createdAt).format(
                        "YYYYMMDD hh:mm:ss a"
                      ),
                      "YYYYMMDD hh:mm:ss a"
                    ).calendar()}
                  </span>
                </div>
              </div>
              <Separator className="my-4 " />
              <ScrollArea className="h-[250px]">
                <div className="flex flex-col gap-2" ref={messagesEndRef}>
                  <h2 className="text-lg font-semibold">Replies:</h2>
                  {selectedDiscussion.replies.map((reply, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded-md flex flex-col gap-3"
                    >
                      <div className="message flex flex-row items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h3 className="font-bold">
                            {reply.author.userDetails.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {moment(
                              moment(reply.createdAt).format(
                                "YYYYMMDD hh:mm:ss a"
                              ),
                              "YYYYMMDD hh:mm:ss a"
                            ).calendar()}
                          </span>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap break-words">
                        {reply.reply}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator className="my-4" />
              <div
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                x-chunk="dashboard-03-chunk-1"
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Paperclip className="size-4" />
                          <span className="sr-only">Attach file</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Attach File</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Mic className="size-4" />
                          <span className="sr-only">Use Microphone</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Use Microphone</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    onClick={() => handleAddReply(selectedDiscussion._id)}
                    size="sm"
                    className="ml-auto gap-1.5"
                  >
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </>
  );
};

export default Community;
