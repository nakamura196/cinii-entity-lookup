const findRS = (queryString) => callJps(getRSLookupURI(queryString), queryString, "RS");

const getRSLookupURI = (queryString) => getEntitySourceURI(queryString, null);

// note that this method is exposed on the npm module to simplify testing,
// i.e., to allow intercepting the HTTP call during testing, using sinon or similar.
const getEntitySourceURI = (queryString, type) => {
  // the wdk used below, actually uses the jps php api



  const LIMIT = 200;

  const url = `https://cir.nii.ac.jp/opensearch/articles?title=${queryString}&format=json&sortorder=0&count=${LIMIT}`

  return url
};

const generateDescription = (item) => {
  const authors = item["dc:creator"] || []
  const publisher = item["prism:publicationName"]

  const publisherStr = publisher ? ` / ${publisher}` : ""

  const vol = item["prism:volume"] || ""
  const no = item[["prism:number"]] || ""

  const noStr = no ? `(${no})` : ""

  const pps = [
    item["prism:startingPage"] || -1,
    item["prism:endingPage"] || -1,
  ]

  const pp = pps[0] >= 0 && pps[1] >= 0 ? `${pps[0]}-${pps[1]}` : ""

  const volAndNo = vol || no ? `, ${vol}${noStr}` : ""

  const ppStr = pp ? `, ${pp}` : ""

  const date = item["prism:publicationDate"] || ""

  const dateStr = date ? `, ${date}` : ""

  return `${authors.join(", ")}${publisherStr}${volAndNo}${ppStr}${dateStr}`
}

const callJps = async (url, queryString, nameType) => {
  const response = await fetchWithTimeout(url).catch((error) => {
    return error;
  });

  //if status not ok, through an error
  if (!response.ok)
    throw new Error(
      `Something wrong with the call to Jps, possibly a problem with the network or the server. HTTP error: ${response.status}`
    );

  const responseJson = await response.json();

  const results = responseJson.items.map((item) => {
    const id = item["@id"];
    const uriForDisplay = id;
    const uri = id;

    return {
      nameType,
      id,
      originalQueryString: queryString,
      uriForDisplay,
      uri,
      name: item.title,
      repository: 'cinii',
      description: generateDescription(item),
      image: ""
    };
  });

  return results;
};

/*
     config is passed through to fetch, so could include things like:
     {
         method: 'get',
         credentials: 'same-origin'
    }
*/
const fetchWithTimeout = (url, config = {}, time = 30000) => {
  /*
        the reject on the promise in the timeout callback won't have any effect, *unless*
        the timeout is triggered before the fetch resolves, in which case the setTimeout rejects
        the whole outer Promise, and the promise from the fetch is dropped entirely.
    */

  // Create a promise that rejects in <time> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject('Call to Jps timed out');
    }, time);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([fetch(url, config), timeout]);
};

export default {
  findRS,
  getRSLookupURI,
  fetchWithTimeout,
};
