import React from "react";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const Quiz: React.FC = () => {
  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Quiz Title
                </h1>
              </div>
              <div className="flex gap-6">
                <Button size="sm">Previous</Button>
                <Button size="sm">Next</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 h-full">
                <div className="border rounded-md shadow-md p-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Question <span>1</span> of <span>x</span>
                    </h2>
                    <p className="text-sm mb-4">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Modi, totam vero? Fuga, omnis. Distinctio, ad ducimus
                      ipsum, architecto sequi ullam provident dolorem mollitia
                      voluptate, voluptatibus a nulla hic culpa et?
                    </p>
                  </div>
                  <div className="mb-4">
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sarthakpatel" id="r3" />
                        <Label htmlFor="r3">Sarthak Patel</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex justify-evenly border-t pt-4">
                    <Button size="sm">Submit Answer</Button>
                    <Button size="sm">Reset Answer</Button>
                    <Button size="sm">Finish Now</Button>
                  </div>
                </div>
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Time Taken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 font-medium text-6xl">
                      <span>00:00:00</span>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Questions</CardTitle>
                    <CardDescription>
                      Navigate through questions here!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-green-400"
                      >
                        1
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-gray-400"
                      >
                        1
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-red-400"
                      >
                        1
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-gray-400"
                      >
                        1
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-red-400"
                      >
                        1
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-red-400"
                      >
                        1
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-green-400"
                      >
                        1
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-green-400"
                      >
                        1
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Quiz;
