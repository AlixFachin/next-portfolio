import StdLayout from '@/components/stdlayout';

export default function Custom500() {
    return (
        <StdLayout>
            <div className="bg-white">
                <h1 className="text-4xl">Server Error!</h1>
                <p>An unexpected error occured on the server side. Sorry!</p>
            </div>
        </StdLayout>
    );
}
