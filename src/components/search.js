
<script>
    methods:{
    function search(ime) {
        var q = $(ime).val();
        var request = gapi.client.youtube.search.list({
        q: q,
        part: 'id'
        });
        request.execute(function(response) {
        var str = JSON.stringify(response.result);
        alert()
        return str
                });
            }
        }
</script>