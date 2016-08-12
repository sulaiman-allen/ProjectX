# nestlr
# (networked enabled system (for) tracking (&) listing rentention

Welcome to nestlr, an android app for all your personal cataloging and list making needs.
Simply scan a barcode with the nestlr phone app and watch as information about your scanned
media appears in real time in the web app (your nest). Depending upon the type of media scanned,
different information is displayed. 

###Technical details:
The nestlr phone app is written in Java (source available [here](https://github.com/sulaiman-allen/nestlr-android)).
It makes use of the Google [z-xing](https://github.com/zxing/zxing) (zebras crossing) library for scanning barcodes/QR codes.
Upon scanning, an api call is made to [upcitemdb.com](upcitemdb.com) to retreive initial information. If the resulting json 
object contains an ISBN tag, the media will be saved to the database with a media value of book. If an item doesn't have
an ISBN tag, there is no other information to uniquely identify the media type and media defaults to being music. After the 
call to upcite, another api call is made to Amazon via the asin tag that is returned from upcite for uniform, higher resolution
images. If the media item is a book, another call is made to Google Books for information about author, rating, page count etc.
The final step is to post the object to firebase.

The nestlr web app is written in AngularJs and makes REST calls to firebase for database retrieval. 
