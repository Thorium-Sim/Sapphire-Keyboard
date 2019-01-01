#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <linux/input.h>
#include <string.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <stdbool.h>
#include <string.h>

#define maxInKeymap 89

const char *keymap [maxInKeymap] = {
	"UNKNOWN"  , "ESC", "1"    , "2" , "3"     , "4"    , "5"     , "6"     , "7"      ,"8"       ,
	"9"        , "0"  , "-"    , "=" , "DELETE", "TAB"  , "Q"     , "W"     , "E"      ,"R"       ,
	"T"        , "Y"  , "U"    , "I" , "O"     , "P"    , "["     , "]"     , "return" ,"control" ,
	"A"        , "S"  , "D"    , "F" , "G"     , "H"    , "J"     , "K"     , "L"      ,";"       ,
	"'"        , "`"  , "shift", "\\", "Z"     , "X"    , "C"     , "V"     , "B"      ,"N"       ,
	"M"        , ","  , "."    , "/" , "shift" , ""     , "option", "SPACE" , "caps"   ,"F1"      ,
	"F2"       , "F3" , "F4"   , "F5", "F6"    , "F7"   , "F8"    , "F9"    , "F10"    ,""        ,
	""         , ""   , ""     , ""  , ""      , ""     , ""      , ""      , ""       ,""        ,
	""         , ""   , ""     , ""  , ""      , ""     , ""      , "F11"   , "F12"};

static const char *const evval[3] = {
    "RELEASED",
    "PRESSED ",
    "REPEATED"
};

static const int rShift = 42;
static const int rControl = 29;
static const int rAlt = 56;
static const int rMeta = 125;

static const int lShift = 54;
static const int lControl = 97;
static const int lAlt = 100;
static const int lMeta = 126;

int main(int argc,char* argv[])
{
    int counter;
    if(argc==1) {
        printf("No Keyboards Detected");
        fflush(stdout);
	return 1;
    }
//    printf("Using: %s\n",argv[1]);





    const char *dev = argv[1];
    struct input_event ev;
    ssize_t n;
    int fd;
    fd = open(dev, O_RDONLY);
    if (fd == -1) {
        fprintf(stderr, "Cannot open %s: %s.\n", dev, strerror(errno));
        fflush(stdout);
        return EXIT_FAILURE;
    }
    ioctl( fd, EVIOCGRAB, 1 );
    bool shiftKey = false;
    bool cntrlKey = false;
    bool altKey = false;
    bool metaKey = false;
    while (1) {
        n = read(fd, &ev, sizeof ev);
        if (n == (ssize_t)-1) {
            if (errno == EINTR)
                continue;
            else
                break;
        } else
        if (n != sizeof ev) {
            errno = EIO;
            break;
        }

        if (ev.type == EV_KEY && ev.value >= 0 && ev.value <= 1) {
            int keyCode = ev.code;
	    bool isPressed = (ev.value == 1);

	    if (keyCode == rShift || keyCode == lShift) {
		if (isPressed) {
		    shiftKey = true;
		} else {
		    shiftKey = false;
		}
	    }
	    if (keyCode == rControl || keyCode == lControl) {
		if (isPressed) {
		    cntrlKey = true;
		} else {
		    cntrlKey = false;
		}
	    }
	    if (keyCode == rAlt || keyCode == lAlt) {
		if (isPressed) {
		    altKey = true;
		} else {
		    altKey = false;
		}
	    }
	    if (keyCode == rMeta || keyCode == lMeta) {
		if (isPressed) {
		    metaKey = true;
		} else {
		    metaKey = false;
		}
	    }
	    if (
		keyCode != rShift &&
		keyCode != rControl &&
		keyCode != rAlt &&
		keyCode != rMeta &&
		keyCode != lShift &&
		keyCode != lControl &&
		keyCode != lAlt &&
		keyCode != lMeta) {

		if (isPressed) {

		    //const char *keymap[maxInKeymap]
		    char* keyCode = "";
		    if (ev.code >= maxInKeymap) {
	                printf("{\"shift\":%d, \"control\":%d, \"option\":%d, \"command\":%d, \"scanCode\":\"%s\"}\n", shiftKey, cntrlKey, altKey, metaKey, keymap[0]);
		    } else {
	                printf("{\"shift\":%d, \"control\":%d, \"option\":%d, \"command\":%d, \"scanCode\":\"%s\"}\n", shiftKey, cntrlKey, altKey, metaKey, keymap[ev.code]);
		    }
		    fflush(stdout);

		}
	    }
	}
    }
    fflush(stdout);
    fprintf(stderr, "%s.\n", strerror(errno));
    fflush(stdout);
    return EXIT_FAILURE;
}

