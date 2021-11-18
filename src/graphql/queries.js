export const SEARCH_REPOSITORIES = (queryString, cursor) => {
	let search = `{search(query: "${queryString}", type: REPOSITORY, first:10,after:"${cursor}") {
         repositoryCount
         pageInfo {
           endCursor
           startCursor
           hasNextPage
         }
         edges {
           node {
             ... on Repository {
               name
               id
               description
               url
               viewerHasStarred
               viewerSubscription	
               watchers{
                 totalCount
               }
               stargazers{
                 totalCount
               }
               primaryLanguage {
                name
               }
               repositoryTopics(first:10){
                edges {
                  node {
                    topic {
                      name
                    }
                  }
                }
              }
             }
           }
         }
       }
   }`;
	if (!cursor) search = search.replace(`,after:"${cursor}"`, "");

	return search;
};
