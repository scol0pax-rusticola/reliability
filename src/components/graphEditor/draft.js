/////////////// AUTOLAYOUT
/*
			mxEvent.disableContextMenu(container);

			var mxCellRendererInstallCellOverlayListeners =
				mxCellRenderer.prototype.installCellOverlayListeners;
			mxCellRenderer.prototype.installCellOverlayListeners = function(
				state,
				overlay,
				shape,
			) {
				mxCellRendererInstallCellOverlayListeners.apply(this, arguments);

				mxEvent.addListener(
					shape.node,
					mxClient.IS_POINTER ? 'pointerdown' : 'mousedown',
					function(evt) {
						overlay.fireEvent(
							new mxEventObject('pointerdown', 'event', evt, 'state', state),
						);
					},
				);

				if (!mxClient.IS_POINTER && mxClient.IS_TOUCH) {
					mxEvent.addListener(shape.node, 'touchstart', function(evt) {
						overlay.fireEvent(
							new mxEventObject('pointerdown', 'event', evt, 'state', state),
						);
					});
				}
			};

			var parent = graph.getDefaultParent();

			var addOverlay = function(cell) {
				// Creates a new overlay with an image and a tooltip
				var overlay = new mxCellOverlay(
					new mxImage(plus, 24, 24),
					'Add outgoing',
				);
				overlay.cursor = 'hand';

				// Installs a handler for clicks on the overlay
				overlay.addListener(mxEvent.CLICK, function(sender, evt2) {
					graph.clearSelection();
					var geo = graph.getCellGeometry(cell);

					var v2;

					executeLayout(
						function() {
							v2 = graph.insertVertex(
								parent,
								null,
								'World!',
								geo.x,
								geo.y,
								80,
								30,
							);
							addOverlay(v2);
							graph.view.refresh(v2);
							var e1 = graph.insertEdge(parent, null, '', cell, v2);
						},
						function() {
							graph.scrollCellToVisible(v2);
						},
					);
				});

				// Special CMS event
				overlay.addListener('pointerdown', function(sender, eo) {
					var evt2 = eo.getProperty('event');
					var state = eo.getProperty('state');

					graph.popupMenuHandler.hideMenu();
					graph.stopEditing(false);

					var pt = mxUtils.convertPoint(
						graph.container,
						mxEvent.getClientX(evt2),
						mxEvent.getClientY(evt2),
					);
					graph.connectionHandler.start(state, pt.x, pt.y);
					graph.isMouseDown = true;
					graph.isMouseTrigger = mxEvent.isMouseEvent(evt2);
					mxEvent.consume(evt2);
				});

				// Sets the overlay for the cell in the graph
				graph.addCellOverlay(cell, overlay);
			};

			// Adds cells to the model in a single step
			graph.getModel().beginUpdate();
			var v1;
			try {
				v1 = graph.insertVertex(parent, null, 'Hello,', 0, 0, 80, 30);
				addOverlay(v1);
			} finally {
				// Updates the display
				graph.getModel().endUpdate();
			}

			var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);

			var executeLayout = function(change, post) {
				graph.getModel().beginUpdate();
				try {
					if (change != null) {
						change();
					}

					layout.execute(graph.getDefaultParent(), v1);
				} catch (e) {
					throw e;
				} finally {
					// New API for animating graph layout results asynchronously
					var morph = new mxMorphing(graph);
					morph.addListener(
						mxEvent.DONE,
						mxUtils.bind(this, function() {
							graph.getModel().endUpdate();

							if (post != null) {
								post();
							}
						}),
					);

					morph.startAnimation();
				}
			};

			var edgeHandleConnect = mxEdgeHandler.prototype.connect;
			mxEdgeHandler.prototype.connect = function(
				edge,
				terminal,
				isSource,
				isClone,
				me,
			) {
				edgeHandleConnect.apply(this, arguments);
				executeLayout();
			};

			graph.resizeCell = function() {
				mxGraph.prototype.resizeCell.apply(this, arguments);

				executeLayout();
			};

			graph.connectionHandler.addListener(mxEvent.CONNECT, function() {
				executeLayout();
			});*/
