import Image from 'next/image'

export default function Companies() {
  return (
    <section className='cs-container my-10'>
        <p className='text-lg text-[#202430] opacity-50 mt-10 mb-6'>Companies we helped grow</p>
        <div className='grid grid-cols-2 items-center lg:grid-cols-5 gap-5'>
            <Image src="/images/vodafone-ogo.png" alt='company-logo' width={150} height={50} />
            <Image src="/images/intel-3.png" alt='company-logo' width={150} height={50} />
            <Image src="/images/tesla.png" alt='company-logo' width={150} height={50} />
            <Image src="/images/amd.png" alt='company-logo' width={150} height={50} />
            <Image src="/images/talkit.png" alt='company-logo' width={150} height={50} />
        </div>
    </section>
  )
}
