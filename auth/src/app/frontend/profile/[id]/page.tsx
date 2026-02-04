//params are promise now in next js
export default async function UserProfile({ params }:any) {
    const { id } = await params;  // Wait here, like opening mail after it arrives

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile of {id}</h1>
            <hr/>
        </div>
    )
}
