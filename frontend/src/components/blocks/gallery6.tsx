import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  techStack?: string[];
  status?: string;
  year?: string;
}

interface Gallery6Props {
  heading?: string;
  viewAllUrl?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Featured Projects",
  viewAllUrl = "#",
  items = [],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-16">
      <div className="px-8 lg:px-16">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 text-[#ece4da]">
              {heading}
            </h2>
            <a
              href={viewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg text-[#b9a590] hover:text-[#ece4da] transition-colors"
            >
              View all on GitHub
              <ExternalLink className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto border-[#b9a590]/40 bg-transparent text-[#ece4da] hover:bg-[#b9a590]/20 hover:text-[#ece4da] disabled:opacity-30"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto border-[#b9a590]/40 bg-transparent text-[#ece4da] hover:bg-[#b9a590]/20 hover:text-[#ece4da] disabled:opacity-30"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 lg:ml-16 2xl:ml-[max(4rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-2 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl text-[#ece4da]">
                    {item.title}
                  </div>
                  {(item.status || item.year) && (
                    <div className="mb-2 flex items-center gap-2">
                      {item.status && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#b9a590]/20 text-[#b9a590]">
                          {item.status}
                        </span>
                      )}
                      {item.year && (
                        <span className="text-xs text-[#b9a590]/70">{item.year}</span>
                      )}
                    </div>
                  )}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {item.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded bg-[#574c3f]/50 text-[#ece4da]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mb-8 line-clamp-2 text-sm text-[#b9a590] md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm text-[#ece4da]">
                    View Project{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery6 };
