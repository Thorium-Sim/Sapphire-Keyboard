#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <linux/input.h>
#include <string.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <stdbool.h>

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
        printf("\nNo Keyboards Detected");
	return 1;
    }
    printf("Using: %s\n",argv[1]);





//    const char *dev = "/dev/input/by-id/usb-Logitech_USB_Receiver-if02-event-mouse";
    const char *dev = argv[1];
    struct input_event ev;
    ssize_t n;
    int fd;
    fd = open(dev, O_RDONLY);
    if (fd == -1) {
        fprintf(stderr, "Cannot open %s: %s.\n", dev, strerror(errno));
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
//	    bool isPressed = false;
//		printf("%s", evval[ev.value]);

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
	                printf("{\n shift:%d\n control:%d\n option:%d\n meta:%d\n scanCode:%d\n}\n", shiftKey, cntrlKey, altKey, metaKey, (int)ev.code);
		    }
	    }
	}

    }
    fflush(stdout);
    fprintf(stderr, "%s.\n", strerror(errno));
    return EXIT_FAILURE;
}

