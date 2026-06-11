import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { fetchSection } from "@/lib/fetchers";
import Image from "next/image";

export const metadata = {
  title: "Our Sister Concern - PIPRA Trading",
  description: "Sister concern companies connected with PIPRA Trading.",
};

type ConcernExtra = {
  members?: string[];
  imageSide?: "left" | "right";
};

export default async function SisterConcerns() {
  const section = await fetchSection("sister-concerns");

  const concerns = (section?.items ?? []).filter((item) => item.title).map((item) => {
    const extra = (item.extra && typeof item.extra === "object" ? item.extra : {}) as ConcernExtra;
    return {
      name: item.title!,
      role: item.subtitle || "",
      text: item.description || "",
      image: item.image || "/logo.png",
      imageSide: extra.imageSide || "left",
      members: extra.members ?? [],
    };
  });

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-[#1a3a52] px-5 pb-20 pt-36 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-sm font-normal text-[#dc2626]">Our sister concern</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-normal leading-tight md:text-6xl">
            Company network and support concerns
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            Present sister concern information with clean blocks, images, and concise business roles.
          </p>
        </div>
      </section>
      <section className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px] space-y-8">
          {concerns.length > 0 ? (
            concerns.map((concern, index) => (
              <article key={concern.name + index} className="grid overflow-hidden rounded-[8px] bg-white lg:grid-cols-2">
                <div className={`relative min-h-[360px] ${concern.imageSide === "right" ? "lg:order-2" : ""}`}>
                  <Image src={concern.image} alt={concern.name} fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="text-sm font-normal text-[#dc2626]">{concern.role}</p>
                  <h2 className="mt-3 text-3xl font-normal text-[#1a3a52]">{concern.name}</h2>
                  <p className="mt-5 text-base leading-8 text-gray-600">{concern.text}</p>
                  {concern.members.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-medium text-[#1a3a52]">Member of:</p>
                      <ul className="mt-3 space-y-1.5">
                        {concern.members.map((member) => (
                          <li key={member} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="size-1.5 rounded-full bg-[#dc2626]" />
                            {member}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="py-16 text-center text-gray-400">
              No sister concerns added yet.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
