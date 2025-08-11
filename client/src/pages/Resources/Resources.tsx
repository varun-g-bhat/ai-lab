import React, { useEffect, useState } from "react";
import { ListFilter, Plus, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FaDownload} from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { addResources, getResources } from "@/http/resourceApi";
import { Resource } from "@/types/resource";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastOptions } from "@/config/toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/auth";

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>();
  const [resourceFile, setResourceFile] = useState<File>();
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [resourceInfo, setResourceInfo] = useState<
    Partial<Resource> | undefined
  >();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "resourcefile") {
        setResourceFile(files[0]);
      } else if (name === "thumbnail") {
        setThumbnailFile(files[0]);
      }
    } else {
      setResourceInfo({ ...resourceInfo, [name]: value });
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      const response = await getResources();
      setResources(response.data);
    };

    fetchResources();
  }, []);

  const addResourcemutation = useMutation({
    mutationFn: addResources,
    onSuccess: (res) => {
      console.log(res.data);
      toast.success("Resource Added", toastOptions);
    },
    onError: (error: AxiosError) => {
      const errResponse = error.response?.data as ErrorResponse;
      toast.error(errResponse.message, toastOptions);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    
    if (resourceInfo?.title) {
      formData.append("title", resourceInfo.title);
    }
  
    if (resourceInfo?.description) {
      formData.append("description", resourceInfo.description);
    }
  
    if (resourceFile) {
      formData.append("file", resourceFile);
    }
  
    if (thumbnailFile) {
      formData.append("coverImage", thumbnailFile);
    }
  
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
  
    addResourcemutation.mutate(formData);
  };

  return (
    <>
      <div className="flex w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        PDFs
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Docs</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Images
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>PPTs</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Excel</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Add Files
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Resources</DialogTitle>
                      </DialogHeader>
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Resource Details
                        </legend>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Title
                            </Label>
                            <Input
                              id="title"
                              name="title"
                              placeholder="Title"
                              className="col-span-3"
                              value={resourceInfo?.title}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="grid w-full gap-1.5 scroll:auto">
                            <Label htmlFor="Description">Description</Label>
                            <Textarea
                              placeholder="Type your Description here."
                              id="Description"
                              name="description"
                              className="h-[50px]"
                              value={resourceInfo?.description}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="grid gap-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="pdffile">Resource File</Label>
                              <Input
                                id="resourcefile"
                                name="resourcefile"
                                type="file"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="pdffile">Thumbnail</Label>
                              <Input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Tags
                        </legend>
                        <div className="flex gap-2">
                          <Input value={newTag}
                                onChange={(e) => setNewTag(e.target.value)} placeholder="New tag" />
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
                          <Button onClick={handleSubmit}>Add</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>RESOURCE FILES</CardTitle>
                    <CardDescription>
                      Click file name to open description window
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>File Name</TableHead>
                          <TableHead>Uploaded By</TableHead>
                          <TableHead className="hidden md:table-cell">
                            File Type
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Downloads
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Uploaded at
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {resources?.map((resource) => (
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={resource.coverImage}
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button variant="link" className="">
                                    {resource.title}
                                  </Button>
                                </SheetTrigger>

                                <SheetContent className="w-[300px] sm:w-[540px] md:w-[600px] lg:w-[750px] xl:w-[900px]">
                                  <ScrollArea className="h-[100vh] border p-3">
                                    <SheetHeader>
                                      <SheetTitle>{resource.title}</SheetTitle>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                      <div>
                                        <img
                                          alt="Product image"
                                          className="aspect-square rounded-md object-cover w-fit"
                                          src={resource.coverImage}
                                        />
                                      </div>
                                      <div>
                                        <fieldset className="rounded-lg border p-3">
                                          <legend className="-ml-1 px-1 text-sm font-medium">
                                            Description
                                          </legend>
                                          <ScrollArea className="h-72 border p-2">
                                            {resource.description}
                                          </ScrollArea>
                                        </fieldset>
                                      </div>
                                      <div>
                                        <fieldset className="grid gap-6 rounded-lg border p-4">
                                          <legend>Tags</legend>
                                          <ScrollArea className="w-100 whitespace-nowrap rounded-md border">
                                            <div className="grid grid-rows-2 grid-flow-col p-4 overflow-y-auto gap-7">
                                              <Badge
                                                variant="outline"
                                                className="flex flex-row gap-5 w-fit"
                                              >
                                                Maths
                                              </Badge>
                                              <Badge
                                                variant="outline"
                                                className="flex flex-row gap-5 w-fit"
                                              >
                                                Maths
                                              </Badge>
                                              <Badge
                                                variant="outline"
                                                className="flex flex-row gap-5 w-fit"
                                              >
                                                Maths
                                              </Badge>
                                              <Badge
                                                variant="outline"
                                                className="flex flex-row gap-5 w-fit"
                                              >
                                                Maths
                                              </Badge>
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                          </ScrollArea>
                                        </fieldset>
                                      </div>
                                    </div>
                                    <SheetFooter className="p-5">
                                      <SheetClose asChild>
                                        <Button type="submit">Download</Button>
                                      </SheetClose>
                                    </SheetFooter>
                                  </ScrollArea>
                                </SheetContent>
                              </Sheet>
                            </TableCell>
                            <TableCell className="font-medium">
                              <Link
                                to="/"
                                className="text-foreground hover:text-muted-foreground"
                              >
                                {resource.author.userDetails.name}
                              </Link>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <FaFilePdf className="h-5 w-5" />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {moment(resource.createdAt).format("DD-MM-YYYY")}
                            </TableCell>
                            <TableCell>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <FaDownload />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
};

export default Resources;
