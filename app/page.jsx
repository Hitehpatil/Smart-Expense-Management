import HeroSection from "@/components/hero";
import { featuresData, statsData  ,howItWorksData , testimonialsData} from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";




export default function Home(){
return (
<div className="mt-40">
<HeroSection/>
<section className="py-20 bg-blue-50">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stats, index) => (
                <div key={index}> 
                    <div className="text-4xl font-bold text-blue-600 mb-2">{stats.value}</div>
                    <div className="text-gray-600">{stats.label}</div>
                </div>
            ))}
        </div>
    </div>
</section>


{/* //feature section */}

      {/* features data */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            everything that you need to complete it
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



{/* //how it is work section */}
    <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex justify-center gap-8">
            {howItWorksData.slice(0, 3).map((step, index) => (
              <div key={index} className="text-center w-64">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


{/* //testonomial section */}

   <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What our users say
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      height={40}
                      width={40}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


{/* //last section */}
   <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam minima repudiandae illo.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-500 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>


</div>
);
}