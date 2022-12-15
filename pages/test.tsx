import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const test = () => {
    const network: any = "homestead";
    const provider = new ethers.providers.AlchemyProvider(network, "iDF4TNmHPF9tk6IExx9ZSAS3BUAwWEes");

    const txHash = "0xb5d06bf5fcc1087822c18c806a64132951e07b38881cd4a2c153f3b01c3de21f"
    const contAddress = "0xd7376d3453474df0edc3c462dc64210c8dd2626f";

    const [recept, setRecept] = useState({})

    return (
        <div>test</div>
    )
}

export default test