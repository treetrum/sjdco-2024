export const GET = async () => {
    console.log('Attempting to keep CMS awake...');
    const res = await fetch(process.env.NEXT_PUBLIC_CMS_URL + '/health');

    if (!res.ok) {
        const error = new Error(`Failed (statusCode=${res.status}, statusText=${res.statusText})`);
        console.error(error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('Succeeded');
    return Response.json({ success: true });
};
